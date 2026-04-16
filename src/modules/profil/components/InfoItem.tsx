import React from 'react'
import { Typography, Divider } from 'antd'
import { NAVY } from '../../../styles/common'

const { Text } = Typography

export const iconStyle = { color: NAVY, opacity: 0.5, fontSize: 16 }

export const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div style={{ marginBottom: 28 }}>
    <Text type="secondary" style={{ fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
      {label}
    </Text>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
      {icon}
      <Text style={{ fontSize: 16, color: NAVY }}>{value}</Text>
    </div>
    <Divider style={{ margin: '14px 0 0 0' }} />
  </div>
)
