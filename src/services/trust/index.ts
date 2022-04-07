import { type } from "./type";

class TrustService {
  private status = false;

  get isTrusting() {
    return type.hasPriv && this.status;
  }

  setTrustStatus(status: boolean) {
    this.status = status;
  }
}

export const trustService = new TrustService();
