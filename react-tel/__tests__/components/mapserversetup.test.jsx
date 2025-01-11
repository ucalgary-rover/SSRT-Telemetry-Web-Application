import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UseSettingsGlobalState, DEFAULT_TELEMETRY_ADDRESS_URL, DEFAULT_TILE_LAYER_URL } from '../../src/context/SettingsContext.jsx';
import MapServerSetup from '../../src/components/settings/MapServerSetup.jsx';
import { beforeEach, afterEach, afterAll, describe, it, expect, vi } from 'vitest';

// Tests the functionality of map server setup component

// Mock the UseSettingsGlobalState context
const dispatchMock = vi.fn();

vi.mock('../../src/context/SettingsContext.jsx', () => ({
    UseSettingsGlobalState: () => ({
        state: vi.fn(),
        dispatch: dispatchMock,
    }),
    DEFAULT_TILE_LAYER_URL: '',
}));

describe('MapServerSetup', () => {
    it('renders with default props', () => {
        render(<MapServerSetup />);
        expect(screen.getByText(/map server/i)).not.toBeNull();
        expect(screen.getByPlaceholderText(/tile-server-url/i)).not.toBeNull();
    });

    it('Updates state on Save Changes button click', () => {
        // Arrange
        render(<MapServerSetup />);
        
        // Act
        fireEvent.change(screen.getByPlaceholderText('tile-server-url'), { target: { value: 'http://new-tile-server.com/tile' } });
        fireEvent.click(screen.getByText(/save changes/i));
        
        // Assert dispatch to verify correct payload was sent to user state setting
        expect(dispatchMock).toHaveBeenCalledWith({
            type: 'UPDATE_MAP_SETTINGS',
            payload: { tile_url: 'http://new-tile-server.com/tile' },
        });
    });

    it('Resets to default URL on Reset button click', () => {
        render(<MapServerSetup />);
        
        fireEvent.click(screen.getByText(/reset to defaults/i));
        
        expect(dispatchMock).toHaveBeenCalledWith({
            type: 'UPDATE_MAP_SETTINGS',
            payload: { tile_url: DEFAULT_TILE_LAYER_URL },
        });
    });
});