module "vpc" {
    source = "../../../modules/network/vpc"

    env       = var.env
    namespace = var.namespace
    cidr      = "10.0.0.0/16"
}

module "subnet_list" {
    source = "../../../modules/network/subnet"

    env                   = var.env
    namespace             = var.namespace
    vpc_id                = module.vpc.id
    subnet_parameter_list = [
        {
            availability_zone = "ap-northeast-1a"
            cidr_block        = "10.0.1.0/24"
        },
        {
            availability_zone = "ap-northeast-1c"
            cidr_block        = "10.0.2.0/24"
        },
        {
            availability_zone = "ap-northeast-1a"
            cidr_block        = "10.0.10.0/24"
        }
    ]
}

module "internet_gateway" {
    source = "../../../modules/network/internet_gateway"

    env       = var.env
    namespace = var.namespace
    vpc_id    = module.vpc.id
}

module "elastic_ip" {
    source = "../../../modules/network/elastic_ip"

    env       = var.env
    namespace = var.namespace
}

module "nat_gateway" {
    source = "../../../modules/network/nat_gateway"

    env           = var.env
    namespace     = var.namespace
    subnet_id     = module.subnet_list.subnet_id_list[0]
    allocation_id = module.elastic_ip.id
}

module "route_for_public_subnet" {
    source = "../../../modules/network/route_for_public_subnet"

    env                  = var.env
    namespace            = var.namespace
    vpc_id               = module.vpc.id
    route_parametor_list = [
        {
            subnet_id              = module.subnet_list.subnet_id_list[0]
            destination_cidr_block = "0.0.0.0/0"
            internet_gateway_id    = module.internet_gateway.id
        },
        {
            subnet_id              = module.subnet_list.subnet_id_list[1]
            destination_cidr_block = "0.0.0.0/0"
            internet_gateway_id    = module.internet_gateway.id
        }
    ]
}

module "route_for_private_subnet" {
    source = "../../../modules/network/route_for_private_subnet"

    env                  = var.env
    namespace            = var.namespace
    vpc_id               = module.vpc.id
    route_parametor_list = [
        {
            subnet_id              = module.subnet_list.subnet_id_list[2]
            destination_cidr_block = "0.0.0.0/0"
            nat_gateway_id         = module.nat_gateway.id
        }
    ]
}
