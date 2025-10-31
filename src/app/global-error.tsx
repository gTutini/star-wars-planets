"use client";

import { useEffect } from "react";
import { Button, Code, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Container size="3">
          <Flex
            direction="column"
            align="center"
            justify="center"
            gap="6"
            minHeight="100vh"
            p="4"
          >
            <Flex direction="column" align="center" gap="4">
              <AlertTriangle size={64} strokeWidth={1.5} color="#e5484d" />
              <Heading size="8">Application Error</Heading>
              <Text size="4" color="gray" align="center">
                A critical error occurred. Please try refreshing the page.
              </Text>
              {error.digest && (
                <Text size="2" color="gray">
                  Error ID: <Code>{error.digest}</Code>
                </Text>
              )}
            </Flex>

            <Flex gap="3">
              <Button onClick={() => reset()} size="3">
                Try again
              </Button>
              <Button
                variant="outline"
                size="3"
                onClick={() => (window.location.href = "/")}
              >
                Go to home
              </Button>
            </Flex>
          </Flex>
        </Container>
      </body>
    </html>
  );
}
