import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import MainLogin from "@/src/components/auth/login/MainLogin";
import { prisma } from "@/src/lib/prisma";

const Page = async () => {
    // 1. Read HttpOnly session cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    // Cookie نداریم → Login را نمایش بده
    if (!token) {
        return <MainLogin />;
    }

    // 2. Hash token
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // 3. Find session in database
    const session = await prisma.session.findUnique({
        where: {
            tokenHash,
        },
        include: {
            user: true,
        },
    });

    // Cookie داریم ولی Session وجود ندارد
    if (!session) {
        return <MainLogin />;
    }

    // 4. Check expiration
    if (session.expiresAt < new Date()) {
        await prisma.session.delete({
            where: {
                id: session.id,
            },
        });

        return <MainLogin />;
    }

    // 5. Check user status
    if (session.user.status !== "ACTIVE") {
        return <MainLogin />;
    }

    // 6. User is already logged in
    redirect("/dashboard");
};

export default Page;
