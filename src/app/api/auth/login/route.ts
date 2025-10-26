import { NextResponse } from 'next/server'
import { generateAccessToken, generateRefreshToken } from '@/lib/auth'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }
        // find user in db
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                organizationUsers: {
                    include: {
                        organization: true
                    }
                }
            }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            )
        }

        if (user.status !== 'ACTIVE') {
            return NextResponse.json(
                { error: 'Account is suspended. Please contact support.' },
                { status: 403 }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            )
        }


        const primaryOrgUser = user.organizationUsers[0]
        const role = primaryOrgUser?.role || 'PROPERTY_MANAGER'

        const accessToken = generateAccessToken({
            userId: user.id,
            email: user.email,
            role: role,
            organizationId: primaryOrgUser.organizationId
        });

        const refreshToken = generateRefreshToken({
            userId: user.id
        })

        // token expires after 1 hour
        const expiresAt = Date.now() + (60 * 60 * 1000)

        // Update last login timestamp
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
        })

        const userResponse = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            avatarUrl: user.avatarUrl,
            role: role,
            organization: {
                id: primaryOrgUser.organization.id,
                name: primaryOrgUser.organization.name,
                slug: primaryOrgUser.organization.slug
            }
        }

        const response = NextResponse.json({
            user: userResponse,
            tokens: {
                accessToken,
                refreshToken,
                expiresAt
            }
        }, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Set HTTP-only cookie for middleware
        response.cookies.set('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60,
        });

        return response

    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}