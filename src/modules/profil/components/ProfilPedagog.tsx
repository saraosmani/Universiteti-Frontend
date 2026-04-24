import React, { useState } from 'react'
import { Typography, Tag, Spin, Alert, Avatar, Divider, Row, Col, Button } from 'antd'
import {
  UserOutlined, MailOutlined, CalendarOutlined,
  PhoneOutlined, BankOutlined, BookOutlined, EditOutlined
} from '@ant-design/icons'
import { formatDate } from '../../../utils/utils';
import { useGetPedagogueById } from '../../../hooks/pedagog/useGetPedagogById';
import { InfoItem, iconStyle } from './InfoItem';
import { NAVY } from '../../../styles/common';
import EditPedagogModal from './EditPedagogModal';

const { Title, Text } = Typography

const PedagogProfile = ({ id }: { id: string }) => {
  const { data: pedagog, isLoading, error } = useGetPedagogueById(id)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isLoading) return <Spin size="large" />
  if (error)    return <Alert type="error"   message="Gabim gjatë ngarkimit" description={error.message} showIcon />
  if (!pedagog) return <Alert type="warning" message="Pedagogu nuk u gjet" showIcon />

  const initials = `${pedagog.ped_em?.[0] ?? ''}${pedagog.ped_mb?.[0] ?? ''}`.toUpperCase()

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button
          type="text"
          icon={<EditOutlined style={{ fontSize: 18, color: NAVY }} />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <Row gutter={48} align="middle" style={{ minHeight: 320 }}>
        <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Avatar size={128} style={{ backgroundColor: NAVY, fontSize: 40, fontWeight: 700 }}>
              {initials || <UserOutlined />}
            </Avatar>
          </div>
          <div style={{ marginTop: 20 }}>
            <Title level={4} style={{ margin: 0, color: NAVY }}>
              {pedagog.ped_em} {pedagog.ped_mb}
            </Title>
            <Text type="secondary" style={{ fontSize: 14 }}>{pedagog.ped_id}</Text>
            <div style={{ marginTop: 14 }}>
              <Tag color="blue" style={{ borderRadius: 20, padding: '4px 16px', fontSize: 13 }}>
                {pedagog.ped_tit}
              </Tag>
            </div>
          </div>
        </Col>

        <Col flex="none">
          <Divider type="vertical" style={{ height: 320 }} />
        </Col>

        <Col xs={24} sm={14}>
          <InfoItem icon={<MailOutlined    style={iconStyle} />} label="Email"             value={pedagog.ped_email} />
          <InfoItem icon={<PhoneOutlined   style={iconStyle} />} label="Telefon"           value={pedagog.ped_tel} />
          <InfoItem icon={<BookOutlined    style={iconStyle} />} label="Titulli Akademik"  value={pedagog.ped_tit} />
          <InfoItem icon={<BankOutlined    style={iconStyle} />} label="Departamenti"      value={pedagog.dep_id ?? '—'} />
          <InfoItem icon={<CalendarOutlined style={iconStyle} />} label="Data e Lindjes"   value={formatDate(pedagog.ped_dl)} />
          <InfoItem icon={<CalendarOutlined style={iconStyle} />} label="Data e Punësimit" value={formatDate(pedagog.ped_dt)} />
        </Col>
      </Row>

      <EditPedagogModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pedagog={{
          ped_id: pedagog.ped_id,
          ped_em: pedagog.ped_em,
          ped_mb: pedagog.ped_mb,
          ped_email: pedagog.ped_email,
          ped_tel: pedagog.ped_tel,
          ped_tit: pedagog.ped_tit,
          ped_gjin: pedagog.ped_gjin,
        }}
      />
    </>
  )
}

export default PedagogProfile