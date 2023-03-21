resource "aws_route53_record" "this" {
  depends_on = tolist(var.acm_certificate_set)

  zone_id = var.zone_id

  ttl = var.ttl

  name    = var.name
  type    = var.type
  records = var.record_list
}
