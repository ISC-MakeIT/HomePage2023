locals {
    env       = "production"
    namespace = "makeit-hp-api"
}

provider "aws" {
  region = "ap-northeast-1"
}

module network {
    source = "./src/network"

    env       = local.env
    namespace = local.namespace
}

module alb {
    source = "./src/alb"

    env            = local.env
    namespace      = local.namespace
    vpc_id         = module.network.vpc_id
    subnet_id_list = module.network.public_subnet_list
}
