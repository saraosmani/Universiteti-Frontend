import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, Typography, Tag, Spin, Alert, Avatar, Divider, Row, Col } from 'antd'
import { UserOutlined, MailOutlined, CalendarOutlined, IdcardOutlined } from '@ant-design/icons'
import { useGetStudentById } from '../../hooks/student/useGetStudentById'
import { formatDate } from '../../utils/utils'
import { NAVY } from '../../styles/common'

const { Title, Text } = Typography

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
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

const StudentProfilePage = () => {
const { id } = useParams<{ id: string }>()
const { data: student, isLoading, error } = useGetStudentById(id ?? "")

  if (!id) {
    return <Alert type="error" message="ID i Studentit është i pavlefshëm" description="Ju lutem jepni një ID të vlefshme në URL." showIcon />
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 64 }}>
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return <Alert type="error" message="Gabim gjatë ngarkimit" description={error.message} showIcon />
  }

  if (!student) {
    return <Alert type="warning" message="Studenti nuk u gjet" showIcon />
  }

  const initials = `${student.stu_em?.[0] ?? ''}${student.stu_mb?.[0] ?? ''}`.toUpperCase()
  const statusColor = student.stu_status === 'active' ? 'green' : student.stu_status === 'inactive' ? 'red' : 'orange'

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Title level={4} style={{ color: NAVY, marginBottom: 24 }}>
        Profili i Studentit
      </Title>

      <Card
        bordered={false}
        style={{ borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', width: '100%' }}
        bodyStyle={{ padding: '40px 48px' }}
      >
        <Row gutter={48} align="middle" style={{ minHeight: 320 }}>

          {/* Left — Avatar + name */}
          <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
            <Avatar
              size={128}
              style={{ backgroundColor: NAVY, fontSize: 40, fontWeight: 700 }}
            >
              {initials || <UserOutlined />}
            </Avatar>

            <div style={{ marginTop: 20 }}>
              <Title level={4} style={{ margin: 0, color: NAVY }}>
                {student.stu_em} {student.stu_mb}
              </Title>
              <Text type="secondary" style={{ fontSize: 14 }}>
                {student.stu_nuid}
              </Text>
              <div style={{ marginTop: 14 }}>
                <Tag
                  color={statusColor}
                  style={{ textTransform: 'capitalize', borderRadius: 20, padding: '4px 16px', fontSize: 13 }}
                >
                  {student.stu_status}
                </Tag>
              </div>
            </div>
          </Col>

          {/* Vertical Divider */}
          <Col flex="none">
            <Divider type="vertical" style={{ height: 280 }} />
          </Col>

          {/* Right — Details */}
          <Col xs={24} sm={14}>
            <InfoItem
              icon={<MailOutlined style={{ color: NAVY, opacity: 0.5, fontSize: 16 }} />}
              label="Email"
              value={student.stu_email}
            />
            <InfoItem
              icon={<IdcardOutlined style={{ color: NAVY, opacity: 0.5, fontSize: 16 }} />}
              label="Numri Matrikullimit"
              value={student.stu_nuid}
            />
            <InfoItem
              icon={<CalendarOutlined style={{ color: NAVY, opacity: 0.5, fontSize: 16 }} />}
              label="Data e Lindjes"
              value={formatDate(student.stu_dl)}
            />
            <InfoItem
              icon={<CalendarOutlined style={{ color: NAVY, opacity: 0.5, fontSize: 16 }} />}
              label="Data e Regjistrimit"
              value={formatDate(student.stu_dat_regjistrim)}
            />
          </Col>

        </Row>
      </Card>
    </div>
  )
}

export default StudentProfilePage