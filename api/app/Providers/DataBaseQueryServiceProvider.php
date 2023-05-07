<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Database\Events\TransactionBeginning;
use Illuminate\Database\Events\TransactionCommitted;
use Illuminate\Database\Events\TransactionRolledBack;
use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Events\QueryExecuted;

class DataBaseQueryServiceProvider extends ServiceProvider
{
    private function bindingToOriginPlaceHolderBy(mixed $binding): string
    {
        if (is_string($binding)) {
            return "'{$binding}'";
        }
        if (is_bool($binding)) {
            return $binding ? '1' : '0';
        }
        if (is_int($binding)) {
            return (string) $binding;
        }
        if ($binding === null) {
            return 'NULL';
        }
        if ($binding instanceof Carbon) {
            return "'{$binding->toDateTimeString()}'";
        }
        if ($binding instanceof DateTime) {
            return "'{$binding->format('Y-m-d H:i:s')}'";
        }

        return $binding;
    }

    /** @return string[] */
    private function bindingsToOriginPlaceHoldersBy(QueryExecuted $query): array
    {
        $originPlaceHolders = [];
        foreach ($query->bindings as $binding) {
            $originPlaceHolders[] = $this->bindingToOriginPlaceHolderBy($binding);
        }
        return $originPlaceHolders;
    }

    private function sqlPlaceHoldersReplaceToOriginPlaceHoldersBy(array $originPlaceHolders, string $sql): string
    {
        $result = $sql;
        foreach ($originPlaceHolders as $originPlaceHolder) {
            $result = preg_replace('/\\?/', $originPlaceHolder, $result, 1);
        }
        return $result;
    }

    private function outputToLogBy(QueryExecuted $query, string $sql): void
    {
        logs()->info('SQL', ['sql' => $sql, 'time' => "{$query->time} ms"]);
    }

    public function register(): void
    {
        DB::listen(function (QueryExecuted $query): void {
            $originPlaceHolders = $this->bindingsToOriginPlaceHoldersBy($query);
            $sql                = $this->sqlPlaceHoldersReplaceToOriginPlaceHoldersBy($originPlaceHolders, $query->sql);
            $this->outputToLogBy($query, $sql);
        });

        Event::listen(TransactionBeginning::class, function (TransactionBeginning $event): void {
            logs()->info('SQL START TRANSACTION');
        });

        Event::listen(TransactionCommitted::class, function (TransactionCommitted $event): void {
            logs()->info('SQL COMMIT');
        });

        Event::listen(TransactionRolledBack::class, function (TransactionRolledBack $event): void {
            logs()->info('SQL ROLLBACK');
        });
    }
}
