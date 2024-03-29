import { Client, QueryOptions } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import HttpClient from '@/lib/http-client'

export interface CreateClientInput {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: Date
  supervisionTier?: string
  supervisionLevel?: string
  attorneyName?: string
  attorneyEmail?: string
  attorneyPhone?: string
  charge?: string
  chargeDescription?: string
  docketNumber?: string
  address?: string
  courtAddress?: string
  communitySpaceAddress?: string
  caseManagerSchedule?: string
}

export const clientsClient = {
  ...crudFactory<Client, QueryOptions, CreateClientInput>(ApiEndpoints.CLIENTS),
  getCaseManagers: () => {
    return HttpClient.get<any>(`${ApiEndpoints.CLIENTS}/case-managers`)
  }
}
