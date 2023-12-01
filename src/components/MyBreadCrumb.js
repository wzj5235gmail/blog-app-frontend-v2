import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"

export default function MyBreadCrumb({ breadcrumb }) {

  return (
    <Breadcrumb spacing=".5rem" mx="15vw" my={["2rem", null, null, "3rem"]} fontWeight={400}>
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
