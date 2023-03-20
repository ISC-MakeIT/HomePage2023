resource "aws_lb" "main" {
  load_balancer_type = var.load_balancer_type
  name               = var.name

  security_groups = [var.security_group_id]
  subnets         = var.subnet_id_list
}
