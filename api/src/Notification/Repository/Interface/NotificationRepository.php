<?php

namespace MakeIT\Notification\Repository\Interface;

interface NotificationRepository
{
    public function findAll();

    public function findByNotificationId();

    public function save();

    public function deleteByNotificationId();
}
