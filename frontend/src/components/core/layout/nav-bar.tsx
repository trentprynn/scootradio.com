'use client'

import { Link } from '@chakra-ui/next-js'
import {
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    IconButton,
    Image,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Spacer,
    Stack,
    Text,
    Tooltip,
    useBreakpointValue,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import { FaChevronRight, FaMoon, FaSun } from 'react-icons/fa6'
import { IoLogoVenmo } from 'react-icons/io5'

export function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Stack direction={'row'} spacing={4}>
                    <Image boxSize={'32px'} src="/logo192.png" alt="ScootRadio logo" />

                    <AboutPopover />
                </Stack>

                <Spacer />

                <HStack gap={1}>
                    <Tooltip label={colorMode === 'light' ? 'Dark mode' : 'Light mode'}>
                        <IconButton
                            variant={'ghost'}
                            size="lg"
                            aria-label={`Toggle light/dark color theme`}
                            icon={colorMode === 'light' ? <FaMoon size={'24px'} /> : <FaSun size={'24px'} />}
                            onClick={() => {
                                toggleColorMode()
                            }}
                        />
                    </Tooltip>

                    <Tooltip label={'Tip me?'}>
                        <Link href="https://venmo.com/u/TrentPrynn" target="_blank">
                            <IconButton
                                variant={'ghost'}
                                size="lg"
                                aria-label={`Tip the creator of scootradio.com`}
                                icon={<IoLogoVenmo size={'32px'} />}
                                color="blue.400"
                                onClick={() => {
                                    toggleColorMode()
                                }}
                            />
                        </Link>
                    </Tooltip>
                </HStack>
            </Flex>
        </Box>
    )
}

const AboutPopover = () => {
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')

    const trigger = useBreakpointValue<'click' | 'hover' | undefined>(
        {
            base: 'click',
            md: 'hover',
        },
        {
            fallback: 'click',
        }
    )

    return (
        <Stack direction={'row'} spacing={4}>
            <Popover trigger={trigger} placement={'bottom-start'}>
                <PopoverTrigger>
                    <Button variant={'ghost'} size="sm">
                        About
                    </Button>
                </PopoverTrigger>
                <PopoverContent border={0} boxShadow={'xl'} bg={popoverContentBgColor} p={4} rounded={'xl'} minW={'sm'}>
                    <Stack>
                        <AboutPopoverSubItem label="Creator" subLabel="Trent Prynn" href={'https://trentprynn.com'} />
                        <AboutPopoverSubItem
                            label="Source Code"
                            subLabel="GitHub"
                            href={'https://github.com/trentprynn/scootradio.com'}
                        />
                    </Stack>
                </PopoverContent>
            </Popover>
        </Stack>
    )
}

type AboutPopoverSubItemProps = {
    label: string
    href: string
    subLabel: string
}

const AboutPopoverSubItem = ({ label, href, subLabel }: AboutPopoverSubItemProps) => {
    return (
        <Box
            as="a"
            href={href}
            target="_blank"
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                >
                    <Icon color={'pink.400'} w={5} h={5} as={FaChevronRight} />
                </Flex>
            </Stack>
        </Box>
    )
}
