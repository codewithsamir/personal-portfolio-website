import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Theme from "@/models/Theme";

export async function GET() {
  try {
    await dbConnect();
    let theme = await Theme.findOne();
    if (!theme) {
      theme = await Theme.create({});
    }
    return NextResponse.json(theme);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    let theme = await Theme.findOne();
    
    if (theme) {
      // Add current colors to history if they are different from the last one
      const lastHistory = theme.history[theme.history.length - 1];
      if (!lastHistory || lastHistory.primaryColor !== body.primaryColor || lastHistory.accentColor !== body.accentColor) {
        theme.history.push({
          primaryColor: body.primaryColor,
          accentColor: body.accentColor,
          timestamp: new Date()
        });
        
        // Keep only last 20 entries
        if (theme.history.length > 20) {
          theme.history.shift();
        }
      }

      theme.primaryColor = body.primaryColor;
      theme.accentColor = body.accentColor;
      theme.borderRadius = body.borderRadius;
      theme.fontFamily = body.fontFamily;
      theme.darkMode = body.darkMode;
      
      await theme.save();
    } else {
      theme = await Theme.create({
        ...body,
        history: [{
          primaryColor: body.primaryColor,
          accentColor: body.accentColor,
          timestamp: new Date()
        }]
      });
    }
    
    return NextResponse.json(theme);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
