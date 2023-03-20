module "security_group" {
    source = "../../../modules/network/security_group"

    env         = var.env
    namespace   = var.namespace
    vpc_id      = var.vpc_id
    egress_map = [
        {
            from_port   = 0
            to_port     = 0
            protocol    = "-1"
            cidr_blocks = ["0.0.0.0/0"]
        }
    ]
    ingress_map = []
}

module "security_group_rule" {
    source = "../../../modules/network/security_group_rule"

    security_group_id = module.security_group.id
    type = "ingress"
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
}

module "lb" {
    source = "../../../modules/alb/lb"

    load_balancer_type = "application"
    name               = var.namespace
    security_group_id  = module.security_group.id
    subnet_id_list     = var.subnet_id_list
}

module "lb_listener" {
    source = "../../../modules/alb/lb_listener"

    load_balancer_arn = module.lb.arn

    list_for_redirect = [
    ]
    list_for_fixed_response = [
        {
            port         = "80"
            protocol     = "HTTP"
            content_type = "text/plain"
            status_code  = "200"
            message_body = "ok"
        },
    ]
}
