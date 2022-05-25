import { DeepPartial } from './utils';

export interface InvitationWords {
    from?: string;
    to?: string;
};

export interface InvitationDestination {
    text: string;
    link: string;
}

export interface InvitationDetails {
    [key: string]: string | InvitationDestination;
}

export interface InvitationGuest {
    name: string;
    id: string;
    overwrite?: DeepPartial<Pick<Invitation, 'message' | 'accept' | 'deny'>>
}

export default interface Invitation {
    name: string;
    lang?: string;
    message: string;
    host: string;
    words?: InvitationWords;
    accept: InvitationDestination;
    deny: InvitationDestination;
    details?: InvitationDetails;
    guests?: InvitationGuest[];
}