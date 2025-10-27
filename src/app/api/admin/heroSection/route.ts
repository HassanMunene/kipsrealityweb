import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get all hero content
        const [content, features, stats] = await Promise.all([
            prisma.heroSectionContent.findMany({
                where: { isActive: true },
                orderBy: { order: 'asc' }
            }),
            prisma.heroSectionFeature.findMany({
                where: { isActive: true },
                orderBy: { order: 'asc' }
            }),
            prisma.heroSectionStat.findMany({
                where: { isActive: true },
                orderBy: { order: 'asc' }
            })
        ]);

        return NextResponse.json({
            content: content.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {}),
            features,
            stats
        });
    } catch (error) {
        console.error('Error fetching hero content:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { content, features, stats } = await request.json();

        // Update content
        if (content) {
            for (const [key, value] of Object.entries(content)) {
                await prisma.heroSectionContent.upsert({
                    where: { key },
                    update: { value: String(value) },
                    create: {
                        key,
                        value: String(value),
                        dataType: 'text'
                    }
                });
            }
        }

        // Update features
        if (features) {
            // First deactivate all features
            await prisma.heroSectionFeature.updateMany({
                data: { isActive: false }
            });

            // Create/update new features
            for (const feature of features) {
                await prisma.heroSectionFeature.upsert({
                    where: { id: feature.id || '' },
                    update: {
                        icon: feature.icon,
                        text: feature.text,
                        subtext: feature.subtext,
                        order: feature.order,
                        isActive: true
                    },
                    create: {
                        icon: feature.icon,
                        text: feature.text,
                        subtext: feature.subtext,
                        order: feature.order
                    }
                });
            }
        }

        // Update stats
        if (stats) {
            await prisma.heroSectionStat.updateMany({
                data: { isActive: false }
            });

            for (const stat of stats) {
                await prisma.heroSectionStat.upsert({
                    where: { id: stat.id || '' },
                    update: {
                        label: stat.label,
                        value: stat.value,
                        trend: stat.trend,
                        color: stat.color,
                        order: stat.order,
                        isActive: true
                    },
                    create: {
                        label: stat.label,
                        value: stat.value,
                        trend: stat.trend,
                        color: stat.color,
                        order: stat.order
                    }
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating hero content:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}