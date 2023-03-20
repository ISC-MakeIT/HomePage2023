variable "load_balancer_arn" {
    type = string
}

variable "list_for_redirect" {
    type = set(
        object({
            port         = string
            protocol     = string
            content_type = string
            status_code  = string
        })
    )
}

variable "list_for_fixed_response" {
    type = set(
        object({
            port         = string
            protocol     = string
            content_type = string
            status_code  = string
            message_body = string
        })
    )
}

