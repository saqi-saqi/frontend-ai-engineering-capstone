import { NextResponse } from 'next/server';
import { getSystemHealthData } from '@/lib/health';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const healthData = getSystemHealthData();
    return NextResponse.json(healthData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message || 'Health check probe failed',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
