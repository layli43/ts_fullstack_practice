import type { FC } from 'react';

import Link from 'next/link';

import { Button } from '../_components/shadcn/ui/button';
import $styles from './page.module.css';

const App: FC = () => (
    <main className="tw:page-item">
        <div className={$styles.block}>
            欢迎来到3R教室，这是Nextjs课程的开始
            <Button asChild>
                <Link href="https://3rcd.com" target="_blank">
                    查看官网
                </Link>
            </Button>
        </div>
    </main>
);
export default App;
