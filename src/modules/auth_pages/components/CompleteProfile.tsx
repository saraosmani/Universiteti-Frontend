import { Form, Input, Select, Button, Typography, Steps, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/hooks'
import { setUser, User } from '../../../store/authSlice'
import { COUNTRIES } from '../utils/countries'
import { DIGITS_RE } from '../utils/validation'
import { primaryBtnStyle } from '../../../styles/common'
import { useState } from 'react'
import { post } from '../../../api/api'
import { GlobalOutlined, PhoneOutlined, UserSwitchOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface ProfileFormBody {
  temp_token: string | null
  phone_number: string
  country: string
  role: string
}

interface AuthResponse {
  data: {
    user: User
    token: string
  }
}

const CompleteProfileForm = () => {
  const [form] = Form.useForm<ProfileFormBody>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [dialCode, setDialCode] = useState('355')
  const [loading, setLoading] = useState(false)

  const handleCountryChange = (value: string) => {
    const found = COUNTRIES.find(c => c.value === value)
    if (found?.dialCode) setDialCode(found.dialCode)
  }

  const handleFinish = async ({ phone_number, country, role }: ProfileFormBody) => {
    const fullPhone = `+${dialCode}${phone_number.replace(/\s/g, '')}`
    const tempToken = sessionStorage.getItem('oauth_temp_token')
    setLoading(true)
    try {
      const data = await post<ProfileFormBody, AuthResponse>(
        '/api/auth/complete_profile',
        { temp_token: tempToken, phone_number: fullPhone, country, role }
      )
      sessionStorage.removeItem('oauth_temp_token')
      dispatch(setUser({ user: data.data.user, token: data.data.token }))
      navigate('/dashboard', { replace: true })
    } catch (e) {
      const error = e as { response?: { data?: { message?: string } } }
      message.error(error?.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const dialSelector = (
    <Select
      value={dialCode}
      onChange={setDialCode}
      showSearch
      style={{ width: 105 }}
      popupMatchSelectWidth={240}
      filterOption={(input, option) =>
        (option?.searchLabel ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={COUNTRIES.map(c => ({
        value: c.dialCode,
        label: `${c.flag} +${c.dialCode}`,
        searchLabel: `${c.label} +${c.dialCode}`,
      }))}
    />
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <div style={{ width: '100%', maxWidth: 480, padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#0F172A', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 16px',
          }}>
            <UserSwitchOutlined style={{ fontSize: 24, color: '#fff' }} />
          </div>
          <Title level={3} style={{ margin: '0 0 8px', color: '#0F172A' }}>
            Përfundo Profilin
          </Title>
          <Text type="secondary" style={{ fontSize: 14 }}>
            Vendos të dhënat e tua për të aktivizuar llogarinë tënde
          </Text>
        </div>

        {/* Steps indicator */}
        <Steps
          size="small"
          current={1}
          style={{ marginBottom: 32 }}
          items={[
            { title: 'Google' },
            { title: 'Profili' },
            { title: 'Gati' },
          ]}
        />

        {/* Card */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          padding: '32px 32px 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <Form form={form} layout="vertical" requiredMark={false} onFinish={handleFinish}>

            <Form.Item
              name="country"
              label={<span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}><GlobalOutlined style={{ marginRight: 6 }} />Shteti</span>}
              rules={[{ required: true, message: 'Ju lutem zgjidhni vendin tuaj' }]}
              style={{ marginBottom: 20 }}
            >
              <Select
                showSearch
                placeholder="Zgjidhni shtetin..."
                size="large"
                onChange={handleCountryChange}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={COUNTRIES.map(c => ({ value: c.value, label: `${c.flag}  ${c.label}` }))}
              />
            </Form.Item>

            <Form.Item
              name="phone_number"
              label={<span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}><PhoneOutlined style={{ marginRight: 6 }} />Numri i Telefonit</span>}
              rules={[
                { required: true, message: 'Ju lutem shkruani numrin tuaj të telefonit' },
                {
                  validator(_, value: string) {
                    const digits = (value ?? '').replace(/\s/g, '')
                    if (!digits || DIGITS_RE.test(digits)) return Promise.resolve()
                    return Promise.reject(new Error('Shkruani vetëm shifrat e numrit'))
                  },
                },
              ]}
              style={{ marginBottom: 20 }}
            >
              <Input addonBefore={dialSelector} placeholder="681234567" size="large" maxLength={14} />
            </Form.Item>

            <Form.Item
              name="role"
              label={<span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}><UserSwitchOutlined style={{ marginRight: 6 }} />Roli</span>}
              rules={[{ required: true, message: 'Ju lutem zgjidhni rolin tuaj' }]}
              style={{ marginBottom: 28 }}
            >
              <Select
                placeholder="Zgjidhni rolin..."
                size="large"
                options={[
                  { value: 'student',       label: 'Student'       },
                  { value: 'pedagog',       label: 'Pedagog'       },
                  { value: 'administrator', label: 'Administrator' },
                ]}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                style={primaryBtnStyle}
              >
                PËRFUNDO REGJISTRIMIN
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 16, fontSize: 12 }}>
          Të dhënat tuaja janë të sigurta dhe nuk ndahen me palë të treta.
        </Text>

      </div>
    </div>
  )
}

export default CompleteProfileForm