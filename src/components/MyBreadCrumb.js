import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"

export default function MyBreadCrumb({breadcrumb}) {

  return (
    <Breadcrumb spacing='.5rem' mx={[6, null, 100, null, 300]} my='3rem' fontWeight={400}>
      {breadcrumb && breadcrumb.map(i => {
        return (
          <BreadcrumbItem key={i.id} isCurrentPage={i.isCurrentPage}>
            <BreadcrumbLink href={i.path}>{i.name}</BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}
