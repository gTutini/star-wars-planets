import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { EarthIcon, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <Container size="3">
      <Flex align="center" direction="column" gap="6" py="6">
        <Button variant="ghost" asChild>
          <Link href="/" aria-label="Return to home page">
            <ArrowLeft size={16} />
            Go Back
          </Link>
        </Button>

        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="6"
          minHeight="50vh"
        >
          <Flex direction="column" align="center" gap="4">
            <EarthIcon size={64} strokeWidth={1.5} />
            <Heading size="8">Planet Not Found</Heading>
            <Text size="4" color="gray" align="center">
              This planet doesn&apos;t exist in our database. It might have been
              destroyed by the Death Star.
            </Text>
          </Flex>

          <Button size="3" asChild>
            <Link href="/">Explore other planets</Link>
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
