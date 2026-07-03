import { File, FileCog2, FileCog2Icon } from 'lucide-react';
import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return <FileCog2Icon {...props} size={14} className="text-foreground" />;
}
