import dbConnect from "@/lib/mongodb";
import Theme from "@/models/Theme";

export async function ThemeInjector() {
  await dbConnect();
  const theme = await Theme.findOne().lean();

  if (!theme) return null;

  // Convert HEX to HSL or just use HEX if variables are set up
  // Tailwind 4 handles HEX fine if we just set the variables.
  
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      :root, .dark {
        --primary: ${theme.primaryColor};
        --secondary: ${theme.accentColor};
        --radius: ${theme.borderRadius};
        --font-sans: "${theme.fontFamily}", ui-sans-serif, system-ui, sans-serif;
      }
      
      .btn-gradient {
        background: linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor}) !important;
      }
      
      .text-gradient {
        background: linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor}, ${theme.primaryColor});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200% auto;
      }

      .selection\\:bg-primary\\/30 {
        background-color: ${theme.primaryColor}4d !important; /* 30% opacity hex */
      }
    `}} />
  );
}
