"use client"

import { useState, FormEvent } from 'react'
import {
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import styles from './LoginForm.module.scss'
import { MountAnimation } from '@/shared/animations/MountAnimation'

interface LoginData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  // Показ - скрытие пароля
  const [showPassword, setShowPassword] = useState(false)

  // Данные формы
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: ""
  });

  // Ошибки параллельно данным
  const [errors, setErrors] = useState<Record<keyof LoginData, string>>({
    email: "",
    password: ""
  });

  // Видимость пароля
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  // Проверка на ошибки формы
  const validate = () => {
    const newErrors: Record<keyof LoginData, string> = {
      email: "",
      password: ""
    }
    let isValid = true

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log('Form is valid, sending data:', formData)
    }
  }

  return (
    <MountAnimation>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            
            <div className={styles.header}>
              <div className={styles.avatar}>
                <LockOutlinedIcon />
              </div>
              <h1 className={styles.title}>Sign in</h1>
              <span className={styles.subtitle}>
                Welcome back! Please enter your details.
              </span>
            </div>

            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                error={!!errors.password}
                helperText={errors.password}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end" aria-label="Toggle password visibility">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <div className={styles.actionsRow}>
                <label className={styles.checkboxLabel}>
                  <Checkbox size="small" />
                  <span>Remember me</span>
                </label>

                <a href="#" className={styles.link}>
                  Forgot password?
                </a>
              </div>

              <Button type="submit" variant="contained" size="large" fullWidth>
                Sign in
              </Button>

              <div className={styles.footer}>
                Don&apos;t have an account?{' '}
                <a href="/registration" className={styles.link}>
                  Sign up
                </a>
              </div>
            </form>

          </div>
        </div>
      </div>
    </MountAnimation>
  )
}