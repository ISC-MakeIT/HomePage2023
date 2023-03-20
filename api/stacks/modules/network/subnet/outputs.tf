output "subnet_id_list" {
  value = tolist(aws_subnet.subnet)[*].id
}
