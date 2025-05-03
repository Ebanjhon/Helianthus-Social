export function formatTimeAgo(timecreate: string): string {
    const now = new Date();
    const createdAt = new Date(timecreate);
    const diffMs = now.getTime() - createdAt.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);

    if (diffSec < 60) return 'Vài giây trước';
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHour < 24) return `${diffHour} giờ trước`;

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const postDate = new Date(
        createdAt.getFullYear(),
        createdAt.getMonth(),
        createdAt.getDate(),
    );
    const diffDays = Math.floor(
        (today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';

    return `${diffDays} ngày trước`;
}