import { Title, Container, Text, Image } from '@mantine/core';

export function Top() {
    const containerProps = {
        bg: 'var(--mantine-color-blue-light)',
        h: 50,
        mt: 'md',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const titleProps = {
        order: 1,
        style: {
            display: 'flex',
            alignItems: 'center',
        },
    };

    const logoProps = {
        src: "../robot.jpg",
        alt: 'Logo',
        width: 30,
        height: 30,
        style: {
            marginRight: '0.5rem',
        },
    };

    return (
        <Container {...containerProps}>
            <Title {...titleProps}>
                <Image {...logoProps} />
                <Text size="xl">Hexagon</Text>
            </Title>
        </Container>
    );
}