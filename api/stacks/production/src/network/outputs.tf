output "vpc_id" {
    value = module.vpc.id
}

output "public_subnet_list" {
    value = [
        module.subnet_list.subnet_id_list[0],
        module.subnet_list.subnet_id_list[1]
    ]
}

output "private_subnet_list" {
    value = [
        module.subnet_list.subnet_id_list[2]
    ]
}

output "subnet_list" {
    value = module.subnet_list.subnet_id_list
}
