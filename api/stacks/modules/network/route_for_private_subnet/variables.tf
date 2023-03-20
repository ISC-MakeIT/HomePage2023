variable "env" {
    type = string
}
variable "namespace" {
    type = string
}
variable "vpc_id" {
    type = string
}
variable "route_parametor_list" {
    type = list(
        object({
            subnet_id              = string
            destination_cidr_block = string
            nat_gateway_id         = string
        })
    )
}
