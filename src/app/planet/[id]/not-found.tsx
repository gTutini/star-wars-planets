import {
  AccessibleIcon,
  Button,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { EarthIcon, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <Container size="3">
      <Flex align="center" direction="column" gap="6" py="6">
        <Button variant="ghost" asChild>
          <Link href="/" aria-label="Return to planets list">
            <AccessibleIcon label="Back arrow">
              <ArrowLeft size={16} aria-hidden="true" />
            </AccessibleIcon>
            Go Back
          </Link>
        </Button>

        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="6"
          minHeight="50vh"
          role="alert"
          aria-live="polite"
        >
          <Flex direction="column" align="center" gap="4">
            <AccessibleIcon label="Planet icon">
              <EarthIcon size={64} strokeWidth={1.5} aria-hidden="true" />
            </AccessibleIcon>
            <Heading size="8">Planet Not Found</Heading>
            <Text size="4" color="gray" align="center">
              This planet doesn&apos;t exist in our database. It might have been
              destroyed by the Death Star.
            </Text>
          </Flex>

          <Button size="3" asChild>
            <Link href="/" aria-label="Return to planets list">
              Explore other planets
            </Link>
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
