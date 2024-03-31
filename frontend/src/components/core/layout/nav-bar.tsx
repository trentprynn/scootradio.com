'use client'

import { Link } from '@chakra-ui/next-js'
import {
    Box,
    Button,
    Flex,
    Icon,
    Image,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Spacer,
    Stack,
    Text,
    Tooltip,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa6'
import { IoLogoVenmo } from 'react-icons/io5'

export function NavBar() {
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

                <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'}>
                    <Tooltip label={'Tip me?'}>
                        <Link
                            href="https://venmo.com/u/TrentPrynn"
                            target="_blank"
                            color="blue.400"
                            _hover={{ color: 'blue.500' }}
                            pt={2}
                        >
                            <Icon as={IoLogoVenmo} w={'32px'} h={'32px'} />
                        </Link>
                    </Tooltip>
                </Stack>
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
            <Popover trigger={trigger}>
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
