variable "env" {
    type = string
}

variable "namespace" {
    type = string
}

variable "vpc_id" {
    type = string
}

variable subnet_id_list {
    type = set(string)
}
