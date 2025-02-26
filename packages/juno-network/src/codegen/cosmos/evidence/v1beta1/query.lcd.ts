import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Any } from "../../../google/protobuf/any";
import { setPaginationParams } from "@osmonauts/helpers";
import { LCDClient } from "@osmonauts/lcd";
import { QueryEvidenceRequest, QueryEvidenceResponse, QueryAllEvidenceRequest, QueryAllEvidenceResponse } from "./query";
export class LCDQueryClient extends LCDClient {
  constructor({
    restEndpoint
  }: {
    restEndpoint: string;
  }) {
    super({
      restEndpoint
    });
  }

  /* Evidence queries evidence based on evidence hash. */
  async evidence(params: QueryEvidenceRequest): Promise<QueryEvidenceResponse> {
    const endpoint = `cosmos/evidence/v1beta1/evidence/${params.evidence_hash}`;
    return await this.get<QueryEvidenceResponse>(endpoint);
  }

  /* AllEvidence queries all evidence. */
  async allEvidence(params: QueryAllEvidenceRequest = {
    pagination: undefined
  }): Promise<QueryAllEvidenceResponse> {
    const options: any = {
      params: {}
    };

    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }

    const endpoint = `cosmos/evidence/v1beta1/evidence`;
    return await this.get<QueryAllEvidenceResponse>(endpoint, options);
  }

}