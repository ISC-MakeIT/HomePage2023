variable load_balancer_type {
    type = string
}

variable name {
    type = string
}

variable security_group_id {
    type = string
}

variable subnet_id_list {
    type = set(string)
}
