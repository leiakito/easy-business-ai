import Link from 'next/link'

import { docs } from '@/.velite'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Documentation',
  description: 'Manage and view all documentation'
}

export default function DocsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-4xl font-bold">Documentation</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <Card key={doc.slugAsParams}>
            <CardHeader>
              <CardTitle>{doc.title}</CardTitle>
              <CardDescription>{doc.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Slug: {doc.slug}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/docs/${doc.slugAsParams}`} passHref>
                <Button variant="outline">View</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
