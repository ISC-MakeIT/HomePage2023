variable "env" {
    type = string
}

variable "namespace" {
    type = string
}

variable "vpc_id" {
    type = string
}

variable "egress_map" {
    type = set(
        object({
            from_port   = string
            to_port     = string
            protocol    = string
            cidr_blocks = set(string)
        })
    )
}

variable "ingress_map" {
    type = set(
        object({
            from_port   = string
            to_port     = string
            protocol    = string
            cidr_blocks = set(string)
        })
    )
}
