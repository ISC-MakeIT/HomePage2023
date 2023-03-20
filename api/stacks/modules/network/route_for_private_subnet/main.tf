resource "aws_route_table" "main" {
  vpc_id = var.vpc_id

  tags = {
    Name = "${var.namespace}-${var.env}"
  }
}

resource "aws_route" "route" {
  for_each = { for index, route_parametor in var.route_parametor_list : index => route_parametor }

  destination_cidr_block = each.value.destination_cidr_block
  nat_gateway_id         = each.value.nat_gateway_id
  route_table_id         = aws_route_table.main.id
}

resource "aws_route_table_association" "private_1a" {
  for_each = { for index, route_parametor in var.route_parametor_list : index => route_parametor }

  subnet_id      = each.value.subnet_id
  route_table_id = aws_route_table.main.id
}
