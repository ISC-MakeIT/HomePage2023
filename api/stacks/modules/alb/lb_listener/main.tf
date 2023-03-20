resource "aws_lb_listener" "for_redirect" {
  for_each = { for index, for_redirect in tolist(var.list_for_redirect) : index => for_redirect }

  load_balancer_arn = var.load_balancer_arn

  port     = each.value.port
  protocol = each.value.protocol

  default_action {
    type = "redirect"

    redirect {
      port         = each.value.port
      protocol     = each.value.protocol
      status_code  = each.value.status_code
    }
  }
}

resource "aws_lb_listener" "for_fixed_response" {
  for_each = { for index, for_fixed_response in tolist(var.list_for_fixed_response) : index => for_fixed_response }

  load_balancer_arn = var.load_balancer_arn

  port     = each.value.port
  protocol = each.value.protocol

  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = each.value.content_type
      status_code  = each.value.status_code
      message_body = each.value.message_body
    }
  }
}

