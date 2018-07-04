/* @flow */

declare module 'flowtype/ui-message' {

    import type { Device, T_POPUP, T_UI_EVENT, T_UI } from 'trezor-connect';
    import type { CoinInfo, CoreMessage, BrowserState, SimpleAccount } from 'flowtype';
    import type { SelectFeeLevel } from 'flowtype/fee';

    /*
    * Messages without payload
    */

    declare type MessageWithoutPayload = {
        +type: $PropertyType<T_UI, 'REQUEST_UI_WINDOW'> |
            $PropertyType<T_POPUP, 'CANCEL_POPUP_REQUEST'> |
            $PropertyType<T_UI, 'TRANSPORT'> |
            $PropertyType<T_POPUP, 'OPENED'> |
            $PropertyType<T_UI, 'RECEIVE_BROWSER'> |
            $PropertyType<T_UI, 'CHANGE_ACCOUNT'> |
            $PropertyType<T_UI, 'INSUFFICIENT_FUNDS'> |
            $PropertyType<T_UI, 'CLOSE_UI_WINDOW'> |
            $PropertyType<T_UI, 'LOGIN_CHALLENGE_REQUEST'>
    }

    /*
    * Common message to UI with assigned device
    */

    declare type DeviceMessage = {
        +type:
            $PropertyType<T_UI, 'REQUEST_BUTTON'> |
            $PropertyType<T_UI, 'REQUEST_PIN'> |
            $PropertyType<T_UI, 'INVALID_PIN'> |
            $PropertyType<T_UI, 'REQUEST_PASSPHRASE_ON_DEVICE'> |
            $PropertyType<T_UI, 'REQUEST_PASSPHRASE'>,
        payload: {
            device: Device
        }
    }

    /*
    * Messages to UI
    */

    declare type IFrameHandshake = {
        +type: $PropertyType<T_UI, 'IFRAME_HANDSHAKE'>,
        payload: {
            browser: BrowserState;
        }
    }

    declare type PopupHandshake = {
        +type: $PropertyType<T_POPUP, 'HANDSHAKE'>,
        payload?: {
            settings: any, // TODO
            method: any // TODO
        }
    }

    declare type RequestPermission = {
        +type: $PropertyType<T_UI, 'REQUEST_PERMISSION'>,
        payload: {
            permissions: Array<string>,
            device: Device
        }
    }

    declare type ReceivePermission = {
        +type: $PropertyType<T_UI, 'RECEIVE_PERMISSION'>,
        payload: {
            granted: boolean;
            remember: boolean;
        }
    }

    declare type RequestConfirmation = {
        +type: $PropertyType<T_UI, 'REQUEST_CONFIRMATION'>,
        payload: {
            view: string,
            label: string,
        }
    }

    declare type SelectDevice = {
        +type: $PropertyType<T_UI, 'SELECT_DEVICE'>,
        payload: {
            devices: Array<Device>;
            webusb: boolean;
        }
    }

    declare type BrowserMessage = {
        +type: $PropertyType<T_UI, 'BROWSER_NOT_SUPPORTED'> | $PropertyType<T_UI, 'BROWSER_OUTDATED'>,
        payload: BrowserState
    }

    declare type UnexpectedDeviceMode = {
        +type: $PropertyType<T_UI, 'BOOTLOADER'> | $PropertyType<T_UI, 'INITIALIZE'> | $PropertyType<T_UI, 'FIRMWARE'>,
        payload: Device
    }

    declare type SelectAccount = {
        +type: $PropertyType<T_UI, 'SELECT_ACCOUNT'>,
        payload: {
            accounts: Array<SimpleAccount>;
            coinInfo: CoinInfo;
            complete?: boolean;
            start?: boolean;
        }
    }

    declare type SelectFee = {
        +type: $PropertyType<T_UI, 'SELECT_FEE'>,
        payload: {
            coinInfo: CoinInfo;
            feeLevels: Array<SelectFeeLevel>;
        }
    }

    declare type UpdateCustomFee = {
        +type: $PropertyType<T_UI, 'UPDATE_CUSTOM_FEE'>,
        payload: {
            coinInfo: CoinInfo;
            level: SelectFeeLevel;
        }
    }

    /*
    * Messages from UI
    */

    declare type ReceiveConfirmation = {
        +type: $PropertyType<T_UI, 'RECEIVE_CONFIRMATION'> | $PropertyType<T_UI, 'RECEIVE_PERMISSION'>,
        payload: string // TODO: boolean
    }

    declare type ReceiveDevice = {
        +type: $PropertyType<T_UI, 'RECEIVE_DEVICE'>,
        payload: {
            device: Device;
            remember: boolean;
        }
    }

    declare type ReceivePin = {
        +type: $PropertyType<T_UI, 'RECEIVE_PIN'>,
        payload: string
    }

    declare type ReceivePassphrase = {
        +type: $PropertyType<T_UI, 'RECEIVE_PASSPHRASE'>,
        payload: {
            save: boolean;
            value: string
        }
    }

    declare type ReceiveAccount = {
        +type: $PropertyType<T_UI, 'RECEIVE_ACCOUNT'>,
        payload: ?string
    }

    declare type ReceiveFee = {
        +type: $PropertyType<T_UI, 'RECEIVE_FEE'>,
        payload: {
            +type: 'compose-custom';
            value: number;
        } | {
            +type: 'change-account';
        } | {
            +type: 'send';
            value: string;
        }
    }

    /*
    * Callback message for CustomMessage method
    */

    declare type CustomMessageRequest = {
        +type: $PropertyType<T_UI, 'CUSTOM_MESSAGE_REQUEST'>,
        payload: {
            type: string;
            message: Object;
        }
    }

    declare export type UiMessage =
        MessageWithoutPayload
        | DeviceMessage
        | IFrameHandshake
        | PopupHandshake
        | RequestPermission
        | RequestConfirmation
        | SelectDevice
        | BrowserMessage
        | UnexpectedDeviceMode
        | SelectAccount
        | SelectFee
        | UpdateCustomFee
        | ReceivePermission
        | ReceiveConfirmation
        | ReceiveDevice
        | ReceivePin
        | ReceivePassphrase
        | ReceiveAccount
        | ReceiveFee
        | CustomMessageRequest

    declare function MessageFactory(type: $PropertyType<MessageWithoutPayload, 'type'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<DeviceMessage, 'type'>, payload: $PropertyType<DeviceMessage, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<IFrameHandshake, 'type'>, payload: $PropertyType<IFrameHandshake, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<PopupHandshake, 'type'>, payload: $PropertyType<PopupHandshake, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<RequestPermission, 'type'>, payload: $PropertyType<RequestPermission, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<RequestConfirmation, 'type'>, payload: $PropertyType<RequestConfirmation, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<SelectDevice, 'type'>, payload: $PropertyType<SelectDevice, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<BrowserMessage, 'type'>, payload: $PropertyType<BrowserMessage, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<UnexpectedDeviceMode, 'type'>, payload: $PropertyType<UnexpectedDeviceMode, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<SelectAccount, 'type'>, payload: $PropertyType<SelectAccount, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<SelectFee, 'type'>, payload: $PropertyType<SelectFee, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<UpdateCustomFee, 'type'>, payload: $PropertyType<UpdateCustomFee, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<ReceivePermission, 'type'>, payload: $PropertyType<ReceivePermission, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<ReceiveConfirmation, 'type'>, payload: $PropertyType<ReceiveConfirmation, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<ReceiveDevice, 'type'>, payload: $PropertyType<ReceiveDevice, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<ReceivePin, 'type'>, payload: $PropertyType<ReceivePin, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<ReceivePassphrase, 'type'>, payload: $PropertyType<ReceivePassphrase, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<ReceiveAccount, 'type'>, payload: $PropertyType<ReceiveAccount, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<ReceiveFee, 'type'>, payload: $PropertyType<ReceiveFee, 'payload'>): CoreMessage;
    declare function MessageFactory(type: $PropertyType<CustomMessageRequest, 'type'>, payload: $PropertyType<CustomMessageRequest, 'payload'>): CoreMessage;

    declare export type UiMessageFactory = typeof MessageFactory;
}
