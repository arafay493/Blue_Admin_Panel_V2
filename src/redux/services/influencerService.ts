// @ts-nocheck
import axiosInstance from "../axios";
import {
  ApproveInfluencersTypes,
  ListAllApprovedInfluencersTypes,
  ListAllPendingInfluencersTypes,
  ListAllReferrerTypes,
  ListAllRejectedInfluencersTypes,
  Referrer,
  ReferrerDashboardDetails,
  RejectInfluencersTypes,
  RemoveInfluencersTypes,
} from "../models/influencerTypes";

// ? List All Pending Influencers
export const ListAllPendingInfluencers = async (): Promise<
  ListAllPendingInfluencersTypes[]
> => {
  const response = await axiosInstance.get<{
    data: ListAllPendingInfluencersTypes[];
  }>(`/Customer/ListAllPendingInfluencerRequests`);
  return response.data.data;
};

// ? List All Approved Influencers
export const ListAllApprovedInfluencers = async (): Promise<
  ListAllApprovedInfluencersTypes[]
> => {
  const response = await axiosInstance.get<{
    data: ListAllApprovedInfluencersTypes[];
  }>(`/Customer/ListAllApprovedInfluencerRequests`);
  return response.data.data;
};

// ? List All Rejected Influencers
export const ListAllRejectedInfluencers = async (): Promise<
  ListAllRejectedInfluencersTypes[]
> => {
  const response = await axiosInstance.get<{
    data: ListAllRejectedInfluencersTypes[];
  }>(`/Customer/ListAllRejectedInfluencerRequests`);
  return response.data.data;
};

// ? List All Rejected Influencers
export const ListAllRefrerrers = async (): Promise<ListAllReferrerTypes[]> => {
  const response = await axiosInstance.get<{
    data: ListAllRejectedInfluencersTypes[];
  }>(`/Customer/GetAllReferrers`);
  return response.data.data;
};

// ? Remove Influencer Request
export const RemoveInfluencerRequestService = (
  payload: any
): Promise<RemoveInfluencersTypes> => {
  return axiosInstance
    .post<{ data: RemoveInfluencersTypes }>(
      `/Customer/RemoveInfluencerRequest`,
      payload
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

// ? Approve Influencer Request
export const ApproveInfluencerRequestService = (
  payload: any
): Promise<ApproveInfluencersTypes> => {
  return axiosInstance
    .post<{ data: ApproveInfluencersTypes }>(
      `/Customer/ApproveInfluencerRequest`,
      payload
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

// ? Reject Influencer Request
export const RejectInfluencerRequestService = (
  payload: any
): Promise<RejectInfluencersTypes> => {
  return axiosInstance
    .post<{ data: RejectInfluencersTypes }>(
      `/Customer/RejectInfluencerRequest`,
      payload
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

export const ListAllReferrers = async (): Promise<Referrer[]> => {
  const response = await axiosInstance.get<{ data: Referrer[] }>(
    `/Customer/GetAllReferrers`
  );
  return response.data.data;
};

export const ListAllReferrersDashboardDetails = async (
  influencerId: number
): Promise<ReferrerDashboardDetails[]> => {
  const response = await axiosInstance.get<{
    data: ReferrerDashboardDetails[];
  }>(`Customer/ListAllRefereeDashboardDetails?influencerId=${influencerId}`);
  return response.data;
};
