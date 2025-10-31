"use client";

import { useEffect } from "react";
import {
  Button,
  Callout,
  Code,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <Container size="3">
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="6"
        minHeight="60vh"
      >
        <Callout.Root color="red" size="3">
          <Callout.Icon>
            <AlertCircle />
          </Callout.Icon>
          <Callout.Text>
            <Heading size="4" mb="2">
              Something went wrong!
            </Heading>
            <Text as="p">
              An unexpected error occurred while loading the page. Please try
              again.
            </Text>
            {error.digest && (
              <Text as="p" mt="2">
                Error ID: <Code>{error.digest}</Code>
              </Text>
            )}
          </Callout.Text>
        </Callout.Root>

        <Flex gap="3">
          <Button onClick={() => reset()} size="3">
            Try again
          </Button>
          <Button variant="outline" size="3" asChild>
            <Link href="/">Go to home</Link>
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
