import { type NextApiRequest, type NextApiResponse } from 'next';
import requestIp from 'request-ip';
import { PostHog } from 'posthog-node';
import { env } from '@/env';
import { getServerAuthSession } from '@/server/auth';
import { toJson } from '@/utils/json-helpers';
import { isDev } from '@/constants';

export type UserActivityType =
  | 'Registration'
  | 'Account closure'
  | 'Subscribe'
  | 'Cancel'
  | 'Donate'
  | 'Adjust Moderated Content Settings'
  | 'Banned'
  | 'Unbanned'
  | 'Muted'
  | 'Unmuted'
  | 'RemoveContent';
export type ModelVersionActivty =
  | 'Create'
  | 'Publish'
  | 'Download'
  | 'Unpublish';
export type ModelActivty =
  | 'Create'
  | 'Publish'
  | 'Update'
  | 'Unpublish'
  | 'Archive'
  | 'Takedown'
  | 'Delete'
  | 'PermanentDelete';
export type ResourceReviewType =
  | 'Create'
  | 'Delete'
  | 'Exclude'
  | 'Include'
  | 'Update';
export type ReactionType =
  | 'Images_Create'
  | 'Images_Delete'
  | 'Comment_Create'
  | 'Comment_Delete'
  | 'Review_Create'
  | 'Review_Delete'
  | 'Question_Create'
  | 'Question_Delete'
  | 'Answer_Create'
  | 'Answer_Delete'
  | 'BountyEntry_Create'
  | 'BountyEntry_Delete'
  | 'Article_Create'
  | 'Article_Delete';
export type ReportType = 'Create' | 'StatusChange';
export type ModelEngagementType = 'Hide' | 'Favorite' | 'Delete';
export type TagEngagementType = 'Hide' | 'Allow';
export type UserEngagementType = 'Follow' | 'Hide' | 'Delete';
export type CommentType =
  | 'Model'
  | 'Image'
  | 'Post'
  | 'Comment'
  | 'Review'
  | 'Bounty'
  | 'BountyEntry';
export type CommentActivity =
  | 'Create'
  | 'Delete'
  | 'Update'
  | 'Hide'
  | 'Unhide';
export type PostActivityType = 'Create' | 'Publish' | 'Tags';
export type ImageActivityType =
  | 'Create'
  | 'Delete'
  | 'DeleteTOS'
  | 'Tags'
  | 'Resources';
export type QuestionType = 'Create' | 'Delete';
export type AnswerType = 'Create' | 'Delete';
export type PartnerActivity = 'Run' | 'Update';
export type BountyActivity =
  | 'Create'
  | 'Update'
  | 'Delete'
  | 'Expire'
  | 'Refund';
export type BountyEntryActivity = 'Create' | 'Update' | 'Delete' | 'Award';
export type BountyBenefactorActivity = 'Create';

export type FileActivity = 'Download';
export type ModelFileActivity = 'Create' | 'Delete' | 'Update';

export const ActionType = [
  'Waitinglist_Subscription',
  'AddToBounty_Click',
  'AddToBounty_Confirm',
  'AwardBounty_Click',
  'AwardBounty_Confirm',
  'Tip_Click',
  'Tip_Confirm',
  'TipInteractive_Click',
  'TipInteractive_Cancel',
  'NotEnoughFunds',
  'PurchaseFunds_Cancel',
  'PurchaseFunds_Confirm',
  'LoginRedirect',
] as const;

export type ActionType = (typeof ActionType)[number];

export type TrackRequest = {
  userId: string;
  ip: string;
  userAgent: string;
};

const client = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});

export class Tracker {
  private _actor: TrackRequest = {
    userId: 'unknown',
    ip: 'unknown',
    userAgent: 'unknown',
  };
  private _session: Promise<string> | undefined;

  constructor(req?: NextApiRequest, res?: NextApiResponse) {
    if (req && res) {
      this._actor.ip = requestIp.getClientIp(req) ?? this._actor.ip;
      this._session = getServerAuthSession({ req, res }).then(session => {
        this._actor.userId = session?.user?.id ?? this._actor.userId;
        return this._actor.userId;
      });
      this._session.catch(() => {
        // ignore
        // TODO: add logging
      });
      this._actor.userAgent =
        req.headers['user-agent'] ?? this._actor.userAgent;
    }
  }

  private async _track(namespace: string, custom: object) {
    try {
      if (
        !env.NEXT_PUBLIC_POSTHOG_HOST ||
        !env.NEXT_PUBLIC_POSTHOG_KEY ||
        isDev
      )
        return;

      if (this._session) await this._session;

      const data = {
        ...this._actor,
        ...custom,
      };

      client.capture({
        distinctId: this._actor.userId,
        event: namespace,
        properties: data,
      });

      await client.shutdown();
    } catch (e) {
      console.log('TRACKING ERROR', e);
    }
  }

  public action(values: { type: ActionType; details?: any }) {
    return this._track('actions', {
      type: values.type,
      details: toJson(values.details) ?? undefined,
    });
  }

  public activity(activity: string) {
    return this._track('activities', { activity });
  }

  public modelEvent(values: {
    type: ModelActivty;
    modelId: number;
    nsfw: boolean;
  }) {
    return this._track('modelEvents', values);
  }

  public modelVersionEvent(values: {
    type: ModelVersionActivty;
    modelId: number;
    modelVersionId: number;
    nsfw: boolean;
    earlyAccess?: boolean;
    time?: Date;
  }) {
    return this._track('modelVersionEvents', values);
  }

  public partnerEvent(values: {
    type: PartnerActivity;
    partnerId: number;
    modelId?: number;
    modelVersionId?: number;
    nsfw?: boolean;
  }) {
    return this._track('partnerEvents', values);
  }

  public userActivity(values: {
    type: UserActivityType;
    targetUserId: number;
    source?: string;
    landingPage?: string;
  }) {
    return this._track('userActivities', values);
  }

  public resourceReview(values: {
    type: ResourceReviewType;
    modelId: number;
    modelVersionId: number;
    nsfw: boolean;
    rating: number;
  }) {
    return this._track('resourceReviews', values);
  }

  public comment(values: { type: CommentType; entityId: number }) {
    return this._track('comments', values);
  }

  public commentEvent(values: { type: CommentActivity; commentId: number }) {
    return this._track('commentEvents', values);
  }

  public post(values: {
    type: PostActivityType;
    postId: number;
    nsfw: boolean;
    tags: string[];
  }) {
    return this._track('posts', values);
  }

  public userEngagement(values: {
    type: UserEngagementType;
    targetUserId: number;
  }) {
    return this._track('userEngagements', values);
  }

  public share(values: {
    url: string;
    platform: 'linkedIn' | 'twitter' | 'whatsapp' | 'clipboard';
  }) {
    return this._track('shares', values);
  }

  public file(values: {
    type: FileActivity;
    entityType: string;
    entityId: number;
  }) {
    return this._track('files', values);
  }

  public search(values: { query: string; index: string; filters?: any }) {
    return this._track('search', values);
  }
}
