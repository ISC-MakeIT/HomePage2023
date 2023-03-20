variable "env" {
    type = string
}
variable "subnet_parameter_list" {
    type = list(
        object({
            availability_zone = string
            cidr_block        = string
        })
    )
}
variable "namespace" {
    type = string
}
variable "vpc_id" {
    type = string
}
