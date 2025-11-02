import { AccessibleIcon, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <Container size="3">
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="6"
        minHeight="60vh"
        role="alert"
        aria-live="polite"
      >
        <Flex direction="column" align="center" gap="4">
          <AccessibleIcon label="Search icon">
            <Search size={64} strokeWidth={1.5} aria-hidden="true" />
          </AccessibleIcon>
          <Heading size="8">404 - Page Not Found</Heading>
          <Text size="4" color="gray" align="center">
            The page you&apos;re looking for doesn&apos;t exist in this galaxy.
          </Text>
        </Flex>

        <Button size="3" asChild>
          <Link href="/" aria-label="Return to home page">Return to home</Link>
        </Button>
      </Flex>
    </Container>
  );
}
