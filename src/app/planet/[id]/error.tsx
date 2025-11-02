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
  AccessibleIcon,
} from "@radix-ui/themes";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Planet page error:", error);
  }, [error]);

  return (
    <Container size="3">
      <Flex direction="column" gap="6" py="6" minHeight="60vh">
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
          flexGrow="1"
          role="alert"
          aria-live="assertive"
        >
          <Callout.Root color="red" size="3">
            <Callout.Icon>
              <AccessibleIcon label="Error">
                <AlertCircle aria-hidden="true" />
              </AccessibleIcon>
            </Callout.Icon>
            <Callout.Text>
              <Heading size="4" mb="2">
                Failed to load planet details
              </Heading>
              <Text as="p">
                We couldn&apos;t load the information for this planet. This
                might be because the planet doesn&apos;t exist or there was a
                problem connecting to the server.
              </Text>
              {error.digest && (
                <Text as="p" mt="2">
                  Error ID: <Code>{error.digest}</Code>
                </Text>
              )}
            </Callout.Text>
          </Callout.Root>

          <Flex gap="3">
            <Button
              onClick={() => reset()}
              size="3"
              aria-label="Try loading the planet again"
            >
              Try again
            </Button>
            <Button variant="outline" size="3" asChild>
              <Link href="/" aria-label="Return to planets list">
                Return to planets list
              </Link>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
