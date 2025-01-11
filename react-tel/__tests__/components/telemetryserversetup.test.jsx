import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UseSettingsGlobalState, DEFAULT_TELEMETRY_ADDRESS_URL, DEFAULT_TELEMETRY_QOS} from '../../src/context/SettingsContext.jsx';
import TelemetryServerSetup from '../../src/components/settings/TelemetryServerSetup.jsx';
import { beforeEach, afterEach, afterAll, describe, it, expect, vi } from 'vitest';

// Tests the functionality of telemetry server component

// Mock the dispatch function
const dispatchMock = vi.fn();

// Leave the entries as empty as we don't ever use the state's variables
// It is only required to declare because our function declares the state.
vi.mock('../../src/context/SettingsContext.jsx', () => ({
    UseSettingsGlobalState: () => ({
        state: vi.fn(),
        dispatch: dispatchMock,
    }),
    DEFAULT_TELEMETRY_ADDRESS_URL: '',
    DEFAULT_TELEMETRY_QOS: '',
}));

describe('TelemetryServerSetup', () => {
    it('Renders with default props', () => {
        render(<TelemetryServerSetup />);
        expect(screen.getAllByText(/telemetry server/i)).not.toBeNull();
        expect(screen.getByPlaceholderText(/mqtt:\/\/hostname:port/i)).not.toBeNull();
        expect(screen.getByPlaceholderText(/0/i)).not.toBeNull();
    });

    it('Updates state on Save Changes button click', () => {
        render(<TelemetryServerSetup />);
        
        // Change the input values
        fireEvent.change(screen.getByPlaceholderText('mqtt://hostname:port'), { target: { value: 'mqtt://new-address.com:1883' } });
        fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: '2' } });
        
        fireEvent.click(screen.getByText(/save changes/i));
        
        // Assert dispatch was called with the correct payload
        expect(dispatchMock).toHaveBeenCalledWith({
            type: 'UPDATE_TELEMETRY_SETTINGS',
            payload: { 
                telemetry_url: 'mqtt://new-address.com:1883', 
                telemetry_qos: '2' 
            },
        });
    });

    it('resets to default values on Reset button click', () => {
        render(<TelemetryServerSetup />);
        
        fireEvent.click(screen.getByText(/reset to defaults/i));
        
        expect(dispatchMock).toHaveBeenCalledWith({
            type: 'UPDATE_TELEMETRY_SETTINGS',
            payload: { 
                telemetry_url: DEFAULT_TELEMETRY_ADDRESS_URL, 
                telemetry_qos: DEFAULT_TELEMETRY_QOS 
            },
        });
    });
});
