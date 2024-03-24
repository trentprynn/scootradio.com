'use client'

import { Link } from '@chakra-ui/next-js'
import {
    Box,
    Collapse,
    Flex,
    Icon,
    IconButton,
    Image,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    Tooltip,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import { Fragment } from 'react'
import { FaBars, FaChevronRight, FaX } from 'react-icons/fa6'
import { IoLogoVenmo } from 'react-icons/io5'

export function NavBar() {
    const { isOpen, onToggle } = useDisclosure()

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
                <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <Icon as={FaX} w={5} h={4} /> : <Icon as={FaBars} w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Image boxSize={'32px'} src="/logo192.png" alt="ScootRadio logo" />

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

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

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box
                                as="a"
                                href={navItem.href ?? '#'}
                                onClick={(e: any) => e.preventDefault()}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}
                            >
                                <Text mt={1}>{navItem.label}</Text>
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
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

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
    return (
        <Stack spacing={4}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
            </Box>

            <Collapse in={true} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {children &&
                        children.map((child, index) => (
                            <Fragment key={index}>
                                <Box as="a" py={2} href={child.href} target="_blank">
                                    {child.label}
                                </Box>

                                {child.subLabel && (
                                    <Box as="a" href={child.href} target="_blank" fontWeight={200}>
                                        {child.subLabel}
                                    </Box>
                                )}
                            </Fragment>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}

interface NavItem {
    label: string
    subLabel?: string
    children?: Array<NavItem>
    href?: string
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'About',
        children: [
            {
                label: 'Creator',
                subLabel: 'Trent Prynn',
                href: 'https://trentprynn.com',
            },
            {
                label: 'Source Code',
                subLabel: 'GitHub',
                href: 'https://github.com/trentprynn/scootradio.com',
            },
        ],
    },
]
