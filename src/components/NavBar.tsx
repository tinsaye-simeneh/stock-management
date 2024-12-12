import { useEffect, useState } from "react";
import { Burger, Button, Group, Menu, Text } from "@mantine/core";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Buy", href: "/buy" },
    { label: "Sell", href: "/sell" },
    { label: "Login", href: "/login" },
    { label: "Signup", href: "/signup" },
  ];

  return (
    <header style={{ backgroundColor: "#f8f9fa" }} className="p-4">
      <div className="flex justify-between items-center h-full">
        <Text size="xl" style={{ color: "#09133c" }}>
          Stock Management
        </Text>

        {isMobile ? (
          <>
            <Burger
              opened={menuOpened}
              onClick={() => setMenuOpened((prev) => !prev)}
              size="sm"
              color="#343a40"
              aria-label="Toggle navigation"
            />
            {menuOpened && (
              <Menu opened={menuOpened} onClose={() => setMenuOpened(false)}>
                <Group dir="column" gap="xs">
                  {menuItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="light"
                      component="a"
                      href={item.href}
                      fullWidth
                      color="dark"
                      onClick={() => setMenuOpened(false)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Group>
              </Menu>
            )}
          </>
        ) : (
          <Group gap="md">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="subtle"
                component="a"
                href={item.href}
                color="dark"
              >
                {item.label}
              </Button>
            ))}
          </Group>
        )}
      </div>
    </header>
  );
}
