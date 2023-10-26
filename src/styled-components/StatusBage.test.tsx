import { render, screen } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import StatusBadge from './StatusBage';


describe("<StatusBage/>", () => {
    test("Renders StatusBadge To DO", () => {
        const { container } = render(<StatusBadge status='To Do' />);
        const badgeText = screen.getByText(/To Do/)
        const badgeIcon = container.getElementsByClassName('ant-badge-status-dot')
        let style = window.getComputedStyle(badgeIcon[0])
        expect(badgeText).toBeDefined();
        expect(badgeIcon[0]).toBeDefined();
        expect(style.backgroundColor).toBe('rgb(16, 142, 233)')
    })
    test("Renders StatusBadge In Progress", () => {
        const { container } = render(<StatusBadge status='In Progress' />);
        const badgeText = screen.getByText(/In Progress/)
        const badgeIcon = container.getElementsByClassName('ant-badge-status-dot')
        let style = window.getComputedStyle(badgeIcon[0])
        expect(badgeText).toBeDefined();
        expect(badgeIcon[0]).toBeDefined();
        expect(style.backgroundColor).toBe('rgb(255, 85, 0)')
    })
    test("Renders StatusBadge In Review", () => {
        const { container } = render(<StatusBadge status='In Review' />);
        const badgeText = screen.getByText(/In Review/)
        const badgeIcon = container.getElementsByClassName('ant-badge-status-dot')
        expect(badgeText).toBeDefined();
        expect(badgeIcon[0]).toBeDefined();
    })
    test("Renders StatusBadge Complete", () => {
        const { container } = render(<StatusBadge status='Complete' />);
        const badgeText = screen.getByText(/Complete/)
        const badgeIcon = container.getElementsByClassName('ant-badge-status-dot')
        expect(badgeText).toBeDefined();
        expect(badgeIcon[0]).toBeDefined();
    })
    test("Renders StatusBadge Empty", () => {
        const { container } = render(<StatusBadge status='' />);
        let badgeText = undefined
        try {
            badgeText = screen.getByText(/Complete/)
        } catch {
            badgeText = undefined
        }
        const badgeIcon = container.getElementsByClassName('ant-badge-status-dot')
        expect(badgeText).toBeUndefined();
        expect(badgeIcon[0]).toBeUndefined();
    })
})